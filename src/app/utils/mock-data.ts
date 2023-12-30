export const apiLogin = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) =>
  new Promise<boolean>((rel, reject) => {
    setTimeout(() => {
      if (username === 'demo' && password === '123456') {
        rel(true);
      } else {
        reject(false);
      }
    }, 2000);
  });
