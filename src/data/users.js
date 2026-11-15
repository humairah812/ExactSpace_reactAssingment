export const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

export const USER_PROFILES = {
  Alan: {
    avatarBg: '#E0F2FE',
    avatarColor: '#0369A1',
    avatarBorder: '#BAE6FD',
    role: 'Product Manager',
  },
  Bob: {
    avatarBg: '#DCFCE7',
    avatarColor: '#15803D',
    avatarBorder: '#BBF7D0',
    role: 'Lead Engineer',
  },
  Carol: {
    avatarBg: '#F3E8FF',
    avatarColor: '#7E22CE',
    avatarBorder: '#E9D5FF',
    role: 'UI/UX Designer',
  },
  Dean: {
    avatarBg: '#FEF3C7',
    avatarColor: '#B45309',
    avatarBorder: '#FDE68A',
    role: 'Backend Architect',
  },
  Elin: {
    avatarBg: '#FFE4E6',
    avatarColor: '#BE123C',
    avatarBorder: '#FECDD3',
    role: 'Frontend Engineer',
  },
};

export function getRandomUser() {
  const index = Math.floor(Math.random() * user_list.length);
  return user_list[index];
}

export function getUserProfile(username) {
  return (
    USER_PROFILES[username] || {
      avatarBg: '#F1F5F9',
      avatarColor: '#475569',
      avatarBorder: '#E2E8F0',
      role: 'Team Member',
    }
  );
}
