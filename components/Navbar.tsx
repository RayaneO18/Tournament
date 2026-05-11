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
  // const handleRefresh = () => {
  //   window.location.reload();};

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
        {/* <button 
      onClick={handleRefresh}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        backgroundColor: 'rgba(34, 211, 238, 0.2)',
        border: '1px solid #22d3ee',
        color: '#22d3ee',
        backdropFilter: 'blur(10px)',
        zIndex: 9999,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px'
      }}
    >
      ↻
    </button> */}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}