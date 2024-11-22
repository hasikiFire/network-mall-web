import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import 'next-auth/jwt';
// 只在后端打印
// fuck auth.js
export const { auth, handlers, signOut, signIn } = NextAuth({
  providers: [
    CredentialProvider({
      credentials: {
        email: {
          type: 'email'
        },
        password: {
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        // 当用户点击登录按钮时，authorize 被触发
        const user = {
          id: '1',
          name: 'John',
          email: credentials?.email as string,
          role: 'admin'
        };
        console.log('authorize user: ', user);
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }

        // 用户输入的 credentials: { email, password }
        // const { email, password } = credentials;
        // // // 在这里调用后端 API 验证凭据
        // // const res = await fetch('https://your-backend.com/api/auth', {
        // //   method: 'POST',
        // //   headers: {
        // //     'Content-Type': 'application/json'
        // //   },
        // //   body: JSON.stringify({ email, password })
        // // });

        // // const user = await res.json();

        // if (res.ok && user.token) {
        //   // 返回用户对象并携带后端生成的 token
        //   return { id: user.id, email: user.email, token: user.token };
        // }

        // 验证失败，返回 null
        return null;
      }
    })
  ],
  pages: {
    signIn: '/' //sigin page
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt(data) {
      console.log('jwt data: ', data);
      // 只在后端打印
      const { token, user } = data;
      if (user?.token) {
        token.accessToken = user.token;
      }
      return token;
    },
    async session(data) {
      console.log('session data: ', data);
      const { session, token } = data;
      if (token?.accessToken) {
        session.accessToken = token.accessToken;

        // session.user.role = token.role;
      }
      return session;
    }
  }
});

// 扩展 User 和 AdapterUser 类型
declare module 'next-auth' {
  interface User {
    token?: string; // 这里添加 token 属性，注意标记为可选
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  }

  // 如果你使用了数据库适配器，还需要扩展 AdapterUser 类型
  interface AdapterUser {
    token?: string;
  }
  interface Session {
    accessToken?: string;
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
}
