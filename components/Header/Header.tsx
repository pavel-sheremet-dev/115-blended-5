import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            TagsMenu
            <Link href="/notes/filter/All">All Notes</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <p>USER NAME</p>
            <button>Logout</button>
          </li>
          <li>
            <Link href="/sign-in">Login</Link>
          </li>
          <li>
            <Link href="/sign-up">Sign up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
