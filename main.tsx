import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Streak {
    lastCompleted: Time;
    highestStreak: bigint;
    currentStreak: bigint;
    milestones: Array<bigint>;
}
export interface PomodoroSession {
    completedAt: Time;
    taskName: string;
    focusDuration: bigint;
    breakDuration: bigint;
}
export interface SoundProfile {
    volume: bigint;
    sound: string;
}
export interface UserProfile {
    soundProfile: SoundProfile;
    theme: Theme;
    streak: Streak;
    sessions: Array<PomodoroSession>;
    totalPomodoros: bigint;
    totalFocusTime: bigint;
}
export enum Theme {
    lavenderDream = "lavenderDream",
    sunnyCitrus = "sunnyCitrus",
    cherryBlossom = "cherryBlossom",
    mintGarden = "mintGarden",
    midnightStars = "midnightStars"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getSessions(): Promise<Array<PomodoroSession>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveSession(taskName: string, focusDuration: bigint, breakDuration: bigint): Promise<void>;
    updateSoundProfile(sound: string, volume: bigint): Promise<void>;
    updateTheme(theme: Theme): Promise<void>;
}
