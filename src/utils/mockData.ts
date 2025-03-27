
export interface DataItem {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  role: 'admin' | 'user' | 'manager';
  lastLogin: string;
  createdAt: string;
}

export const generateMockData = (): DataItem[] => {
  const statuses: DataItem['status'][] = ['active', 'inactive', 'pending'];
  const roles: DataItem['role'][] = ['admin', 'user', 'manager'];
  
  return Array.from({ length: 100 }, (_, i) => {
    const id = crypto.randomUUID();
    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 365));
    
    const lastLoginDate = new Date(createdDate);
    lastLoginDate.setDate(lastLoginDate.getDate() + Math.floor(Math.random() * (new Date().getDate() - createdDate.getDate())));
    
    return {
      id,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      role: roles[Math.floor(Math.random() * roles.length)],
      lastLogin: lastLoginDate.toISOString().split('T')[0],
      createdAt: createdDate.toISOString().split('T')[0],
    };
  });
};

export const mockData = generateMockData();
