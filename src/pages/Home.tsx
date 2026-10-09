import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  Check,
  Heart,
  MapPin,
  Menu,
  PackageCheck,
  Sparkles,
  Utensils,
  X,
} from 'lucide-react';
import { useUser } from 'context/userContext';
import paths from 'router/path';

type Audience = 'donor' | 'receiver';

const steps = [
  {
    number: '01',
    icon: Utensils,
    title: 'Share good food',
    description: 'Donors post fresh surplus food and add the details people need to collect it.',
  },
  {
    number: '02',
    icon: MapPin,
    title: 'Find it nearby',
    description: 'Receivers browse available donations and reserve what works for them.',
  },
  {
    number: '03',
    icon: PackageCheck,
    title: 'Close the loop',
    description: 'Food gets collected, and a simple receipt helps confirm the hand-off.',
  },
];

const Home = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useUser();
  const [audience, setAudience] = useState<Audience>('donor');
  const [menuOpen, setMenuOpen] = useState(false);
  const dashboardPath = user?.is_donor
    ? paths.donordashboard
    : user?.is_receiver
      ? paths.recieverdashboard
      : paths.dashboard;
  const signupPath = `${paths.signup}?role=${audience}`;

  const linkClass = (path: string) =>
    location.pathname === path
      ? 'text-emerald-800 font-semibold'
      : 'text-slate-600 transition-colors hover:text-emerald-800';

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbfaf6] text-[#19352e]">
      <header className="sticky top-0 z-50 border-b border-[#19352e]/10 bg-[#fbfaf6]/90 backdrop-blur-xl">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"
        >
          <Link to={paths.home} className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#1e493c] text-[#d8f078]">
              <Utensils size={19} aria-hidden="true" />
            </span>
            <span className="text-xl font-black tracking-tight text-[#19352e]">
              ShareBite<span className="text-[#95ae35]">.</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a className={linkClass('#how-it-works')} href="#how-it-works">
              How it works
            </a>
            <a className={linkClass('#our-belief')} href="#our-belief">
              Our belief
            </a>
            {isAuthenticated ? (
              <>
                <span className="text-slate-500">Hi, {user?.first_name || user?.username}</span>
                <Link
                  to={dashboardPath}
                  className="rounded-full bg-[#1e493c] px-5 py-2.5 font-semibold text-white transition hover:bg-[#15372d]"
                >
                  Dashboard <ArrowRight className="ml-1 inline" size={15} />
                </Link>
                <button
                  type="button"
                  className="text-slate-600 transition hover:text-emerald-800"
                  onClick={logout}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to={paths.login} className={linkClass(paths.login)}>
                  Log in
                </Link>
                <Link
                  to={signupPath}
                  className="rounded-full bg-[#1e493c] px-5 py-2.5 font-semibold text-white transition hover:bg-[#15372d]"
                >
                  Join the community <ArrowRight className="ml-1 inline" size={15} />
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-[#19352e]/15 md:hidden"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
        {menuOpen && (
          <div className="grid gap-4 border-t border-[#19352e]/10 px-6 py-5 text-sm font-medium md:hidden">
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
              How it works
            </a>
            <a href="#our-belief" onClick={() => setMenuOpen(false)}>
              Our belief
            </a>
            {isAuthenticated ? (
              <>
                <Link to={dashboardPath} onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
                <button className="text-left" type="button" onClick={logout}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to={paths.login} onClick={() => setMenuOpen(false)}>
                  Log in
                </Link>
                <Link to={signupPath} onClick={() => setMenuOpen(false)}>
                  Join the community
                </Link>
              </>
            )}
          </div>
        )}
      </header>

      <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:min-h-[650px] lg:grid-cols-[1fr_0.95fr] lg:gap-8 lg:py-16">
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#dbe7bd] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#45612c] shadow-sm"
          >
            <Sparkles size={15} className="text-[#8ba538]" />
            Good food deserves a good home
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="max-w-2xl text-[3.35rem] font-black leading-[0.98] tracking-[-0.065em] sm:text-7xl lg:text-[5.5rem]"
          >
            A little extra.
            <br />
            <span className="text-[#88a137]">A lot of good.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8"
          >
            ShareBite brings people with surplus food together with people who can use it. Less
            waste, more care, one local hand-off at a time.
          </motion.p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to={isAuthenticated ? dashboardPath : signupPath}
              className="group inline-flex items-center gap-2 rounded-full bg-[#1e493c] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#1e493c]/15 transition hover:-translate-y-0.5 hover:bg-[#15372d]"
            >
              {isAuthenticated
                ? user?.is_receiver
                  ? 'Find food near you'
                  : 'Go to your dashboard'
                : audience === 'donor'
                  ? 'Share a donation'
                  : 'Find food nearby'}
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold text-[#315448] transition hover:bg-[#eaf0de]"
            >
              See how it works <ArrowDown size={16} />
            </a>
          </div>

          {!isAuthenticated && (
            <div className="mt-9 inline-flex rounded-full border border-[#e4e7dd] bg-white p-1.5 shadow-sm">
              <button
                type="button"
                aria-pressed={audience === 'donor'}
                onClick={() => setAudience('donor')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  audience === 'donor'
                    ? 'bg-[#dff08c] text-[#253c22] shadow-sm'
                    : 'text-slate-500 hover:text-[#19352e]'
                }`}
              >
                I have food to share
              </button>
              <button
                type="button"
                aria-pressed={audience === 'receiver'}
                onClick={() => setAudience('receiver')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  audience === 'receiver'
                    ? 'bg-[#dff08c] text-[#253c22] shadow-sm'
                    : 'text-slate-500 hover:text-[#19352e]'
                }`}
              >
                I need food
              </button>
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="relative mx-auto w-full max-w-[560px] lg:ml-auto"
        >
          <div className="absolute -right-6 -top-8 h-32 w-32 rounded-full bg-[#e0edaa] blur-3xl" />
          <div className="absolute -bottom-7 -left-3 h-36 w-36 rounded-full bg-[#f6d6ad] blur-3xl" />
          <div className="relative min-h-[390px] overflow-hidden rounded-[2.5rem] bg-[#e9eddb] p-5 sm:min-h-[465px] sm:p-8">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[35px] border-white/35" />
            <div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full border-[42px] border-[#d3dfac]/70" />

            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 1, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-[9%] top-[14%] z-10 grid h-20 w-20 place-items-center rounded-[1.7rem] bg-[#f6d6ad] text-5xl shadow-xl shadow-[#8f734c]/10 sm:h-24 sm:w-24 sm:text-6xl"
              aria-hidden="true"
            >
              🥑
            </motion.div>
            <motion.div
              animate={{ y: [0, 9, 0], rotate: [0, -1.5, 0] }}
              transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute right-[9%] top-[24%] z-10 grid h-24 w-24 place-items-center rounded-[2rem] bg-white text-6xl shadow-xl shadow-[#35472b]/10 sm:h-28 sm:w-28 sm:text-7xl"
              aria-hidden="true"
            >
              🍊
            </motion.div>

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/2 top-1/2 z-20 w-[78%] -translate-x-1/2 -translate-y-1/2 rotate-[-4deg] rounded-[2rem] bg-[#1e493c] p-5 text-white shadow-2xl shadow-[#19352e]/20 sm:p-7"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="rounded-full bg-[#dff08c] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#294027]">
                    Fresh today
                  </span>
                  <h2 className="mt-4 text-xl font-bold sm:text-2xl">A box of goodness</h2>
                  <p className="mt-1 text-sm text-white/65">Shared by a neighbor nearby</p>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-[#dff08c]">
                  <Heart size={19} fill="currentColor" />
                </span>
              </div>
              <div className="my-5 flex items-center gap-2 text-4xl sm:text-5xl" aria-hidden="true">
                <span>🥕</span>
                <span>🥬</span>
                <span>🍅</span>
                <span>🥖</span>
              </div>
              <div className="flex items-center justify-between border-t border-white/15 pt-4 text-xs font-semibold text-white/75">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} /> Close to your community
                </span>
                <span className="flex items-center gap-1 text-[#dff08c]">
                  <Check size={14} /> Ready to share
                </span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-[11%] right-[8%] z-30 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-[#35472b]/10"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#fff0d9] text-xl">
                💚
              </span>
              <span>
                <span className="block text-xs font-extrabold text-[#19352e]">
                  Good things grow
                </span>
                <span className="block text-[11px] text-slate-500">when we share</span>
              </span>
            </motion.div>
            <div className="absolute bottom-5 left-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#52644d]/65">
              Good food, shared locally
            </div>
          </div>
        </motion.div>
      </section>

      <section id="our-belief" className="border-y border-[#19352e]/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 sm:px-8 md:grid-cols-[1fr_auto] md:items-center">
          <p className="max-w-2xl text-lg font-semibold leading-8 text-[#315448] sm:text-xl">
            “The best ingredient is a community that looks out for one another.”
          </p>
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#eff4df] text-[#72902c]">
              <Heart size={18} />
            </span>
            A kinder way to pass food along
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="mb-12 flex flex-col justify-between gap-5 sm:mb-14 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#819a38]">
              From extra to meaningful
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              Sharing is simple.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-slate-600">
            A few thoughtful steps turn surplus into something useful for someone close by.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map(({ number, icon: Icon, title, description }, index) => (
            <motion.article
              key={number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group rounded-[1.75rem] border border-[#19352e]/10 bg-white p-7 transition-shadow hover:shadow-xl hover:shadow-[#19352e]/5 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#eff4df] text-[#54702a] transition-colors group-hover:bg-[#dff08c]">
                  <Icon size={21} />
                </span>
                <span className="text-sm font-black tracking-widest text-[#a3b174]">{number}</span>
              </div>
              <h3 className="mt-7 text-xl font-extrabold">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#1e493c] px-7 py-12 text-center text-white sm:px-12 sm:py-16">
          <div className="absolute -left-20 -top-28 h-64 w-64 rounded-full border-[35px] border-white/5" />
          <div className="absolute -bottom-36 -right-12 h-72 w-72 rounded-full border-[45px] border-[#dff08c]/10" />
          <div className="relative">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#dff08c]">
              It starts with one meal
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              There’s always enough good to go around.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/70">
              Join the people making sharing a little easier in their community.
            </p>
            <Link
              to={isAuthenticated ? dashboardPath : signupPath}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#dff08c] px-6 py-3.5 text-sm font-extrabold text-[#253c22] transition hover:-translate-y-0.5 hover:bg-[#e9f7b4]"
            >
              {isAuthenticated ? 'Continue to ShareBite' : 'Get started today'}
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <p className="mx-auto max-w-7xl px-5 pb-8 text-center text-sm text-slate-500 sm:px-8">
        Portfolio demo — collection points are illustrative; no real donations are accepted.
      </p>
    </main>
  );
};

export default Home;
