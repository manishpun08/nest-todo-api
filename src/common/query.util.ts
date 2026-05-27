import { QueryDto } from './query.dto';

export function buildPrismaQuery(
  query?: QueryDto,
  searchableFields: string[] = [],
) {
  const where = query?.search
    ? {
        OR: searchableFields.map((field) => ({
          [field]: { contains: query.search, mode: 'insensitive' },
        })),
      }
    : undefined;

  let orderBy: Record<string, 'asc' | 'desc'> | undefined;
  if (query?.sortBy) {
    orderBy = { [query.sortBy]: query.order ?? 'asc' };
  }

  return { where, orderBy };
}
