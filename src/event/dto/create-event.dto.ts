export class CreateEventDto {
    readonly name: string;
    readonly date: Date;
    readonly location?: string;
    readonly description?: string;
  }
  