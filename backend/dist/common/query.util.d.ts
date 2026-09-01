import type { QueryDto } from './query.dto';
export declare function buildPrismaQuery(query?: QueryDto, searchableFields?: string[]): {
    where: {
        OR: {
            [x: string]: {
                contains: string | undefined;
                mode: string;
            };
        }[];
    } | undefined;
    orderBy: Record<string, "asc" | "desc"> | undefined;
    skip: number;
    take: number;
    page: number;
    limit: number;
};
