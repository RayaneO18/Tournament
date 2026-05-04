"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../app/page.module.css";

const tabs = [
  { name: "Aperçu", href: "/" },
  { name: "Calendrier", href: "/calendrier" },
  { name: "Phase poule", href: "/phase-poule" },
  { name: "Phase finale", href: "/phase-finale" },
  { name: "Premier pas", href: "/premier-pas" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navInner}>
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link key={tab.href} href={tab.href} className={styles.navLink}>
              <div className={active ? styles.activeText : styles.inactiveText}>
                {tab.name}
                {active && <div className={styles.underline} />}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}