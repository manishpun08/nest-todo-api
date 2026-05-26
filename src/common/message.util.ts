export class SuccessMessageUtil {
  static created(entity: string) {
    return `${entity} created successfully`;
  }

  static updated(entity: string) {
    return `${entity} updated successfully`;
  }

  static deleted(entity: string) {
    return `${entity} deleted successfully`;
  }

  static fetched(entity: string) {
    return `${entity} fetched successfully`;
  }

  static listFetched(entity: string) {
    return `${entity}s fetched successfully`;
  }
}

export const MessageUtil = SuccessMessageUtil;
