import '~/styles/tailwind.css';
import '~/styles/style.scss';

import { metaObject } from '~/config';
import { ILayoutProps } from '~/interfaces/IRSC';



export const metadata = metaObject({});



export default async function RootLayout({ children }: ILayoutProps) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
