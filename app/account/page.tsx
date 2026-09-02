"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SupportSection from "@/components/SupportSection";
import { deleteThreadForEmail } from "@/lib/support";
import { getPlan } from "@/lib/plans";
import {
  getEmail,
  clearAccount,
  getProfile,
  saveProfile,
  getSubscription,
  cancelSubscription,
  resumeSubscription,
  getBusinesses,
  removeBusiness,
  getEffectivePlanId,
  Profile,
  Subscription,
  Business,
} from "@/lib/account";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return iso;
  }
}

export default function AccountPage() {
  const [loaded, setLoaded] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile>({ name: "", phone: "" });
  const [subscription, setSubscription] = useState<Subscription>({ planId: "trial", status: "active" });
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [savedNotice, setSavedNotice] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  useEffect(() => {
    setEmail(getEmail());
    setProfile(getProfile());
    setSubscription(getSubscription());
    setBusinesses(getBusinesses());
    setLoaded(true);
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile(profile);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleCancel = () => {
    cancelSubscription();
    setSubscription(getSubscription());
  };

  const handleResume = () => {
    resumeSubscription();
    setSubscription(getSubscription());
  };

  const handleDeleteBusiness = (id: string) => {
    removeBusiness(id);
    setBusinesses(getBusinesses());
  };

  const handleLogout = () => {
    clearAccount();
    window.location.href = "/";
  };

  const handleDeleteAccount = () => {
    if (email) deleteThreadForEmail(email);
    clearAccount();
    window.location.href = "/";
  };

  const plan = getPlan(subscription.planId);
  const effectiveLimit = getPlan(getEffectivePlanId()).businessLimit;
  const isPaid = !plan.free;
  const periodStillActive = Boolean(
    subscription.currentPeriodEnd && new Date(subscription.currentPeriodEnd).getTime() > Date.now()
  );

  if (!loaded) {
    return (
      <main>
        <SiteHeader />
      </main>
    );
  }

  if (!email) {
    return (
      <main>
        <SiteHeader />
        <div className="mx-auto max-w-md px-5 py-24 text-center md:px-8">
          <h1 className="font-display text-2xl text-ink-900 mb-2">Личный кабинет</h1>
          <p className="text-muted mb-6">
            Чтобы открыть личный кабинет, сначала зарегистрируйтесь по email — это можно сделать
            прямо перед построением плана.
          </p>
          <Link
            href="/#wizard"
            className="inline-block rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink-800"
          >
            Перейти к анкете
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-display text-3xl text-ink-900">Личный кабинет</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-muted underline underline-offset-4 hover:text-ink-900"
          >
            Выйти
          </button>
        </div>

        {/* PROFILE */}
        <section className="mb-8 rounded-2xl border border-line bg-white p-6">
          <h2 className="font-display text-lg text-ink-900 mb-4">Данные профиля</h2>
          <form onSubmit={handleSaveProfile} className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm text-muted">Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full cursor-not-allowed rounded-xl border border-line bg-soft p-3.5 text-ink-900/60"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-muted">Имя</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Как к вам обращаться"
                className="w-full rounded-xl border border-line bg-white p-3.5 text-ink-900 outline-none transition-colors focus:border-violet"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-muted">Телефон</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                placeholder="+7 900 000-00-00"
                className="w-full rounded-xl border border-line bg-white p-3.5 text-ink-900 outline-none transition-colors focus:border-violet"
              />
            </div>
            <div className="flex items-center gap-3 sm:col-span-2">
              <button
                type="submit"
                className="rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink-800"
              >
                Сохранить
              </button>
              {savedNotice && <span className="text-sm text-violet">Сохранено</span>}
            </div>
          </form>
        </section>

        {/* SUBSCRIPTION */}
        <section className="mb-8 rounded-2xl border border-line bg-white p-6">
          <h2 className="font-display text-lg text-ink-900 mb-4">Подписка</h2>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-soft p-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-xl text-ink-900">{plan.name}</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    subscription.status === "active"
                      ? "bg-violet-soft text-violet"
                      : "bg-ink-900/10 text-ink-900/60"
                  }`}
                >
                  {subscription.status === "active" ? "Активна" : "Отменена"}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted">
                {plan.price} {plan.period} ·{" "}
                {plan.businessLimit === 1 ? "1 бизнес" : `до ${plan.businessLimit} бизнесов`}
              </p>
              {isPaid && subscription.currentPeriodEnd && (
                <p className="mt-1 text-sm font-medium text-ink-900">
                  {subscription.status === "active"
                    ? `Продлится ${formatDate(subscription.currentPeriodEnd)}`
                    : periodStillActive
                    ? `Доступ активен до ${formatDate(subscription.currentPeriodEnd)}`
                    : `Доступ закончился ${formatDate(subscription.currentPeriodEnd)}`}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {isPaid && subscription.status === "active" && (
                <button
                  onClick={handleCancel}
                  className="rounded-full border border-ink-900/20 px-4 py-2 text-sm font-medium text-ink-900 transition-colors hover:bg-ink-900 hover:text-white"
                >
                  Отказаться от подписки
                </button>
              )}
              {isPaid && subscription.status === "cancelled" && (
                <button
                  onClick={handleResume}
                  className="rounded-full bg-ink-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ink-800"
                >
                  Возобновить подписку
                </button>
              )}
              <a
                href="/#pricing"
                className="rounded-full border border-ink-900/20 px-4 py-2 text-sm font-medium text-ink-900 transition-colors hover:bg-ink-900 hover:text-white"
              >
                {isPaid ? "Сменить тариф" : "Выбрать платный тариф"}
              </a>
            </div>
          </div>
          {isPaid && subscription.status === "cancelled" && subscription.currentPeriodEnd && (
            <p className="mt-3 text-xs text-muted">
              {periodStillActive
                ? `Автопродление отключено. Тариф «${plan.name}» и все его возможности останутся доступны до ${formatDate(
                    subscription.currentPeriodEnd
                  )}, дальше аккаунт перейдёт на тариф «Пробный».`
                : `Подписка отменена, оплаченный период закончился ${formatDate(
                    subscription.currentPeriodEnd
                  )}. Сейчас действует тариф «Пробный».`}
            </p>
          )}
          <p className="mt-3 text-xs text-muted">
            Подписка активируется в демо-режиме без реального списания денег — интеграция с
            платёжной системой (ЮKassa/CloudPayments) в разработке.
          </p>
        </section>

        {/* BUSINESSES */}
        <section className="rounded-2xl border border-line bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg text-ink-900">Мои бизнесы</h2>
            <span className="text-sm text-muted">
              {businesses.length} из {effectiveLimit}
            </span>
          </div>

          {businesses.length === 0 && (
            <p className="text-sm text-muted">Пока ни одного плана не создано.</p>
          )}

          <div className="space-y-3">
            {businesses.map((b) => (
              <div
                key={b.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line bg-soft p-4"
              >
                <div>
                  <p className="font-medium text-ink-900">{b.name}</p>
                  <p className="text-sm text-muted">
                    {b.businessType} · план от {formatDate(b.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteBusiness(b.id)}
                  className="text-sm text-muted underline underline-offset-4 hover:text-ink-900"
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>

          <div className="mt-5">
            {businesses.length < effectiveLimit ? (
              <Link
                href="/#wizard"
                className="inline-block rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink-800"
              >
                Создать план для нового бизнеса
              </Link>
            ) : (
              <p className="text-sm text-muted">
                Лимит тарифа «{plan.name}» исчерпан. Удалите бизнес или{" "}
                <a href="/#pricing" className="text-violet underline underline-offset-4">
                  перейдите на другой тариф
                </a>
                , чтобы добавить ещё один.
              </p>
            )}
          </div>
        </section>

        <div className="mt-8">
          <SupportSection email={email} />
        </div>

        <section className="mt-8 rounded-2xl border border-red-200 bg-white p-6">
          <h2 className="mb-1.5 font-display text-lg text-ink-900">Удаление аккаунта</h2>
          <p className="mb-4 text-sm text-muted">
            Удалит профиль, данные подписки, все сохранённые бизнесы и переписку с поддержкой в
            этом браузере. Это необратимо.
          </p>
          {!confirmingDelete ? (
            <button
              onClick={() => setConfirmingDelete(true)}
              className="rounded-full border border-red-300 px-5 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            >
              Удалить аккаунт
            </button>
          ) : (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="mb-3 text-sm text-red-700">
                Точно удалить аккаунт {email}? Данные нельзя будет восстановить.
              </p>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => setConfirmingDelete(false)}
                  className="rounded-full border border-ink-900/20 bg-white px-4 py-2 text-sm font-medium text-ink-900 hover:bg-soft"
                >
                  Отмена
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Да, удалить безвозвратно
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
