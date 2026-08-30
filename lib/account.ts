import { PlanId } from "./plans";

const EMAIL_KEY = "promoplan_email";
const PROFILE_KEY = "promoplan_profile";
const SUBSCRIPTION_KEY = "promoplan_subscription";
const BUSINESSES_KEY = "promoplan_businesses";

export interface Profile {
  name: string;
  phone: string;
}

export interface Subscription {
  planId: PlanId;
  status: "active" | "cancelled";
}

export interface Business {
  id: string;
  name: string;
  businessType: string;
  createdAt: string;
}

function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // локальное хранилище недоступно (приватный режим и т.п.) — для прототипа не критично
  }
}

function safeRemove(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // не критично
  }
}

export function getEmail(): string | null {
  return safeGet(EMAIL_KEY);
}

export function setEmail(value: string) {
  safeSet(EMAIL_KEY, value);
}

export function clearAccount() {
  safeRemove(EMAIL_KEY);
  safeRemove(PROFILE_KEY);
  safeRemove(SUBSCRIPTION_KEY);
  safeRemove(BUSINESSES_KEY);
}

export function getProfile(): Profile {
  const raw = safeGet(PROFILE_KEY);
  if (!raw) return { name: "", phone: "" };
  try {
    return JSON.parse(raw) as Profile;
  } catch {
    return { name: "", phone: "" };
  }
}

export function saveProfile(profile: Profile) {
  safeSet(PROFILE_KEY, JSON.stringify(profile));
}

export function getSubscription(): Subscription {
  const raw = safeGet(SUBSCRIPTION_KEY);
  if (!raw) return { planId: "trial", status: "active" };
  try {
    return JSON.parse(raw) as Subscription;
  } catch {
    return { planId: "trial", status: "active" };
  }
}

export function activateSubscription(planId: PlanId) {
  safeSet(SUBSCRIPTION_KEY, JSON.stringify({ planId, status: "active" }));
}

export function cancelSubscription() {
  const current = getSubscription();
  safeSet(SUBSCRIPTION_KEY, JSON.stringify({ ...current, status: "cancelled" }));
}

export function resumeSubscription() {
  const current = getSubscription();
  safeSet(SUBSCRIPTION_KEY, JSON.stringify({ ...current, status: "active" }));
}

/** Тариф, который реально действует сейчас: отменённая подписка откатывает к пробному */
export function getEffectivePlanId(): PlanId {
  const sub = getSubscription();
  return sub.status === "active" ? sub.planId : "trial";
}

export function getBusinesses(): Business[] {
  const raw = safeGet(BUSINESSES_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Business[];
  } catch {
    return [];
  }
}

export function addBusiness(entry: Omit<Business, "id" | "createdAt">): Business {
  const business: Business = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  const next = [...getBusinesses(), business];
  safeSet(BUSINESSES_KEY, JSON.stringify(next));
  return business;
}

export function removeBusiness(id: string) {
  const next = getBusinesses().filter((b) => b.id !== id);
  safeSet(BUSINESSES_KEY, JSON.stringify(next));
}
