export function UserBadge({ role }) {
    if (role === "admin") {
        return (
            <span className='px-1.5 py-0.5 rounded-md bg-red-100 dark:bg-red-500/35 text-red-800 dark:text-red-500/85 text-[10px] font-bold uppercase tracking-wide'>
                ADMIN
            </span>
        )
    } else if (role === "customer") {
        return (
            <span className='px-1.5 py-0.5 rounded-md bg-yellow-100 dark:bg-yellow-500/35 text-yellow-800 dark:text-yellow-500/85 text-[10px] font-bold uppercase tracking-wide'>
                CUSTOMER
            </span>
        )
    }
    return (
        <span className='px-1.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-500/35 text-blue-800 dark:text-blue-500/85 text-[10px] font-bold uppercase tracking-wide'>
            USER
        </span>
    )
}

export function formatDate(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString);

    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(date);
}