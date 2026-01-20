import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({requestLocale}) => {
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    const baseMessages = await loadMessages(locale);
    return {
        locale,
        messages: {
            ...baseMessages,
            event: baseMessages.events,
            programs: baseMessages.software,
            teams: baseMessages.team,
            about: baseMessages.studio,
        },
    };
});

async function loadMessages(locale: string) {
    const namespaces = [
        "common",
        "nav",
        "home",
        "games",
        "gameDetail",
        "software",
        "events",
        "eventDetail",
        "studio",
        "team",
        "meta",
    ] as const;
    const entries = await Promise.all(
        namespaces.map(async (namespace) => [
            namespace,
            (await import(`./messages/${locale}/${namespace}.json`)).default,
        ])
    );
    return Object.fromEntries(entries);
}
