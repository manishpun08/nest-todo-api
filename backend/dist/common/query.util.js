"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPrismaQuery = buildPrismaQuery;
function buildPrismaQuery(query, searchableFields = []) {
    const where = query?.search
        ? {
            OR: searchableFields.map((field) => ({
                [field]: { contains: query.search, mode: 'insensitive' },
            })),
        }
        : undefined;
    let orderBy;
    if (query?.sortBy) {
        orderBy = { [query.sortBy]: query.order ?? 'asc' };
    }
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 10;
    const skip = (page - 1) * limit;
    const take = limit;
    return { where, orderBy, skip, take, page, limit };
}
//# sourceMappingURL=query.util.js.map