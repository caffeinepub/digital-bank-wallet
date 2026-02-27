// Email/password authentication hook
// Manages session state in localStorage, provides login/logout/register actions

export interface EmailPasswordUser {
  name: string;
  email: string;
}

const SESSION_KEY = 'bluestone_ep_session';

// Simple hash function (djb2) - not cryptographically secure but sufficient for demo
function simpleHash(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
    hash = hash >>> 0; // Convert to unsigned 32-bit integer
  }
  return hash.toString(16);
}

const USERS_KEY = 'bluestone_ep_users';

interface StoredUser {
  name: string;
  email: string;
  passwordHash: string;
}

function loadUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

const DEMO_EMAIL = 'bryanbarton45@gmail.com';
const DEMO_PASSWORD_HASH = simpleHash('alinalaura@24');
const OLD_DEMO_EMAIL = 'bryan.barton@bluestone.bank';

function ensureSeedUser(): void {
  let users = loadUsers();

  // Remove any old demo account with the previous email
  users = users.filter(u => u.email.toLowerCase() !== OLD_DEMO_EMAIL.toLowerCase());

  const exists = users.some(u => u.email.toLowerCase() === DEMO_EMAIL.toLowerCase());
  if (!exists) {
    users.push({
      name: 'Bryan Barton',
      email: DEMO_EMAIL,
      passwordHash: DEMO_PASSWORD_HASH,
    });
    saveUsers(users);
  } else {
    // Ensure the password hash is up to date for the demo account
    const idx = users.findIndex(u => u.email.toLowerCase() === DEMO_EMAIL.toLowerCase());
    if (idx !== -1) {
      users[idx].passwordHash = DEMO_PASSWORD_HASH;
      saveUsers(users);
    }
  }
}

// Ensure seed user exists on module load
ensureSeedUser();

export function loadSession(): EmailPasswordUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as EmailPasswordUser;
  } catch {
    return null;
  }
}

export function saveSession(user: EmailPasswordUser): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function loginWithEmailPassword(
  email: string,
  password: string
): { success: true; user: EmailPasswordUser } | { success: false; error: string } {
  const users = loadUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return { success: false, error: 'No account found with that email address.' };
  }
  if (user.passwordHash !== simpleHash(password)) {
    return { success: false, error: 'Incorrect password. Please try again.' };
  }
  const sessionUser: EmailPasswordUser = { name: user.name, email: user.email };
  saveSession(sessionUser);
  return { success: true, user: sessionUser };
}

export function registerWithEmailPassword(
  name: string,
  email: string,
  password: string
): { success: true; user: EmailPasswordUser } | { success: false; error: string } {
  const users = loadUsers();
  const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return { success: false, error: 'An account with this email already exists.' };
  }
  const newUser: StoredUser = {
    name: name.trim(),
    email: email.toLowerCase().trim(),
    passwordHash: simpleHash(password),
  };
  users.push(newUser);
  saveUsers(users);
  return { success: true, user: { name: newUser.name, email: newUser.email } };
}
