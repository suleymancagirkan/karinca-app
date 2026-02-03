import { createLog } from '@/lib/logger';

// ... (GET stays same)

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { subject, message, priority, categoryId } = await req.json();

        if (!subject || !message || !priority || !categoryId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const ticket = await prisma.ticket.create({
            data: {
                subject,
                priority,
                status: 'open',
                userId: session.user.id,
                categoryId: categoryId,
                messages: {
                    create: {
                        content: message,
                        senderId: session.user.id
                    }
                }
            }
        });

        // Log the action
        await createLog('TICKET_CREATE', `Created ticket #${ticket.id}: ${subject}`, session.user.id);

        return NextResponse.json(ticket);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
