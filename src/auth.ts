import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import 'next-auth/jwt';
// NextAuth 只存在后端
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
      async authorize(credentials) {
        console.log('credentials: ', credentials);
        // 当用户点击登录按钮时，authorize 被触发
        const user = {
          email: credentials?.email as string
        };

        if (user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/' //sigin page
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
