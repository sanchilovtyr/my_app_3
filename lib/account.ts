import { PlanId } from "./plans";

const EMAIL_KEY = "promoplan_email";
const PROFILE_KEY = "promoplan_profile";
const SUBSCRIPTION_KEY = "promoplan_subscription";
const BUSINESSES_KEY = "promoplan_businesses";

const BILLING_PERIOD_DAYS = 30;

export interface Profile {
  name: string;
  phone: string;
}

export interface Subscription {
  planId: PlanId;
  status: "active" | "cancelled";
  /** ISO-дата, когда тариф был активирован (или последний раз продлён/возобновлён) */
  startedAt?: string;
  /** ISO-дата, до которой действует оплаченный период */
  currentPeriodEnd?: string;
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

function addDays(date: Date, days: number): string {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next.toISOString();
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

/** Активирует тариф на новый оплаченный период (30 дней от текущего момента) */
export function activateSubscription(planId: PlanId) {
  const now = new Date();
  const sub: Subscription = {
    planId,
    status: "active",
    startedAt: now.toISOString(),
    currentPeriodEnd: addDays(now, BILLING_PERIOD_DAYS),
  };
  safeSet(SUBSCRIPTION_KEY, JSON.stringify(sub));
}

/** Отмена автопродления — доступ сохраняется до конца уже оплаченного периода */
export function cancelSubscription() {
  const current = getSubscription();
  safeSet(SUBSCRIPTION_KEY, JSON.stringify({ ...current, status: "cancelled" }));
}

/** Возобновление: если период ещё не закончился — просто снимаем отмену,
 *  если уже закончился — активируем заново, как новую оплату */
export function resumeSubscription() {
  const current = getSubscription();
  const stillWithinPeriod =
    current.currentPeriodEnd && new Date(current.currentPeriodEnd).getTime() > Date.now();

  if (stillWithinPeriod) {
    safeSet(SUBSCRIPTION_KEY, JSON.stringify({ ...current, status: "active" }));
  } else {
    activateSubscription(current.planId);
  }
}

/** Тариф, который реально действует сейчас: отменённая и уже истёкшая подписка
 *  откатывает к пробному, но пока не истёк оплаченный период — доступ сохраняется */
export function getEffectivePlanId(): PlanId {
  const sub = getSubscription();
  if (sub.planId === "trial") return "trial";

  if (sub.status === "active") return sub.planId;

  const stillWithinPeriod =
    sub.currentPeriodEnd && new Date(sub.currentPeriodEnd).getTime() > Date.now();
  return stillWithinPeriod ? sub.planId : "trial";
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
