export default (applicantId: string, isAuth = false) => ({
  applicantId,
  isAuth,
  domainId: import.meta.env.VITE_DOMAIN_ID,
  publicKey: import.meta.env.VITE_PUBLIC_KEY,
  domainApi: import.meta.env.VITE_DVSO_URL.slice(0, -1),
  callbacks: {},
});
