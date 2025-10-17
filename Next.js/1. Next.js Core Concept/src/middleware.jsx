import { NextResponse } from 'next/server'

const middleware = (request) => {
    let cookies = request.cookies.get('nextjs-token');
    // console.log(cookies?.value);
    const data = {
        role: 'admin',
        email: 'admin@test.com'
    }

    const isServicePage = request.nextUrl.pathname.startsWith('/services');
    const isAdmin = data.role === 'admin';

    if (isServicePage && !isAdmin) {
        // return NextResponse.rewrite(new URL('/', request.url));
        return NextResponse.redirect(new URL('/', request.url));
    } else {
        return NextResponse.next();
    }
}

export default middleware;

/* Rewrite and Redirect:
- Rewrite: It allows you to serve different content at the same URL without changing the URL in the browser. It's like an internal route change.
- Redirect: It sends a response to the browser to navigate to a different URL, changing the URL in the browser's address bar.
*/