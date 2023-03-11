export class GdprSettings {
    public gdprDecision: GdprDecision = GdprDecision.NoDecision;
}

export enum GdprDecision {
  NoDecision,
  AcceptedAll,
  DeclinedAll
}
