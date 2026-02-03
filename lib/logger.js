import prisma from '@/lib/prisma';

/**
 * Creates a system log entry.
 * @param {string} action - The action type (e.g., 'SETTINGS_UPDATE', 'USER_LOGIN')
 * @param {string} details - Detailed description of the action
 * @param {string|null} userId - The ID of the user performing the action (optional)
 * @returns {Promise<object>} The created log entry
 */
export async function createLog(action, details, userId = null) {
    try {
        const log = await prisma.systemLog.create({
            data: {
                action,
                details,
                userId
            }
        });
        return log;
    } catch (error) {
        console.error('Failed to create system log:', error);
        // We don't want log failures to break the flow of the application
        return null;
    }
}
