import Map "mo:core/Map";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import List "mo:core/List";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type Theme = {
    #cherryBlossom;
    #mintGarden;
    #lavenderDream;
    #sunnyCitrus;
    #midnightStars;
  };

  public type SoundProfile = {
    sound : Text;
    volume : Nat;
  };

  public type PomodoroSession = {
    taskName : Text;
    focusDuration : Nat;
    breakDuration : Nat;
    completedAt : Time.Time;
  };

  public type Streak = {
    currentStreak : Nat;
    highestStreak : Nat;
    lastCompleted : Time.Time;
    milestones : [Nat];
  };

  public type UserProfile = {
    theme : Theme;
    soundProfile : SoundProfile;
    totalPomodoros : Nat;
    totalFocusTime : Nat;
    streak : Streak;
    sessions : [PomodoroSession];
  };

  type InternalUserProfile = {
    theme : Theme;
    soundProfile : SoundProfile;
    totalPomodoros : Nat;
    totalFocusTime : Nat;
    streak : Streak;
    sessions : List.List<PomodoroSession>;
  };

  module PomodoroSession {
    public func compareByTime(a : PomodoroSession, b : PomodoroSession) : Order.Order {
      Nat.compare(
        a.completedAt.toNat(),
        b.completedAt.toNat(),
      );
    };
  };

  let userProfiles = Map.empty<Principal, InternalUserProfile>();

  // Required by instructions: get the caller's own profile
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access their profiles");
    };

    switch (userProfiles.get(caller)) {
      case (null) { null };
      case (?profile) {
        ?{
          theme = profile.theme;
          soundProfile = profile.soundProfile;
          totalPomodoros = profile.totalPomodoros;
          totalFocusTime = profile.totalFocusTime;
          streak = profile.streak;
          sessions = profile.sessions.toArray();
        };
      };
    };
  };

  // Required by instructions: save the caller's own profile
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };

    let internalProfile : InternalUserProfile = {
      theme = profile.theme;
      soundProfile = profile.soundProfile;
      totalPomodoros = profile.totalPomodoros;
      totalFocusTime = profile.totalFocusTime;
      streak = profile.streak;
      sessions = List.fromArray(profile.sessions);
    };
    userProfiles.add(caller, internalProfile);
  };

  // Required by instructions: fetch another user's profile (caller can view own, admin can view any)
  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };

    switch (userProfiles.get(user)) {
      case (null) { null };
      case (?profile) {
        ?{
          theme = profile.theme;
          soundProfile = profile.soundProfile;
          totalPomodoros = profile.totalPomodoros;
          totalFocusTime = profile.totalFocusTime;
          streak = profile.streak;
          sessions = profile.sessions.toArray();
        };
      };
    };
  };

  public shared ({ caller }) func saveSession(taskName : Text, focusDuration : Nat, breakDuration : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save sessions");
    };

    let session : PomodoroSession = {
      taskName;
      focusDuration;
      breakDuration;
      completedAt = Time.now();
    };

    let defaultStreak : Streak = {
      currentStreak = 0;
      highestStreak = 0;
      lastCompleted = 0;
      milestones = [];
    };

    switch (userProfiles.get(caller)) {
      case (null) {
        let newProfile : InternalUserProfile = {
          theme = #cherryBlossom;
          soundProfile = { sound = "default"; volume = 50 };
          totalPomodoros = 1;
          totalFocusTime = focusDuration;
          streak = defaultStreak;
          sessions = List.singleton(session);
        };
        userProfiles.add(caller, newProfile);
      };
      case (?profile) {
        let sessions = profile.sessions.clone();
        sessions.add(session);

        let updatedProfile : InternalUserProfile = {
          theme = profile.theme;
          soundProfile = profile.soundProfile;
          totalPomodoros = profile.totalPomodoros + 1;
          totalFocusTime = profile.totalFocusTime + focusDuration;
          streak = profile.streak;
          sessions;
        };
        userProfiles.add(caller, updatedProfile);
      };
    };
  };

  public shared ({ caller }) func updateTheme(theme : Theme) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update themes");
    };

    switch (userProfiles.get(caller)) {
      case (null) { Runtime.trap("User profile not found") };
      case (?profile) {
        let updatedProfile : InternalUserProfile = {
          theme;
          soundProfile = profile.soundProfile;
          totalPomodoros = profile.totalPomodoros;
          totalFocusTime = profile.totalFocusTime;
          streak = profile.streak;
          sessions = profile.sessions;
        };
        userProfiles.add(caller, updatedProfile);
      };
    };
  };

  public shared ({ caller }) func updateSoundProfile(sound : Text, volume : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update sound profiles");
    };

    switch (userProfiles.get(caller)) {
      case (null) { Runtime.trap("User profile not found") };
      case (?profile) {
        let updatedSoundProfile = { sound; volume };
        let updatedProfile : InternalUserProfile = {
          theme = profile.theme;
          soundProfile = updatedSoundProfile;
          totalPomodoros = profile.totalPomodoros;
          totalFocusTime = profile.totalFocusTime;
          streak = profile.streak;
          sessions = profile.sessions;
        };
        userProfiles.add(caller, updatedProfile);
      };
    };
  };

  public query ({ caller }) func getSessions() : async [PomodoroSession] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access their sessions");
    };

    switch (userProfiles.get(caller)) {
      case (null) { [] };
      case (?profile) {
        profile.sessions.toArray().sort(PomodoroSession.compareByTime);
      };
    };
  };
};
