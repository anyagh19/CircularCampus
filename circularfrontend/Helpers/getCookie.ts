export default function getCookie(name: string): string | null {
    console.log('All cookies:', document.cookie);
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
}