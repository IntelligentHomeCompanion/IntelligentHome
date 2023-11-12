/**
 * Essentially, allows easy interaction with as many possible
 * supported values from here: https://schema.org/
 * To define intents and such
 */

class SchemaObject {
  constructor(opts) {
    // Thing Schema Properties
    this.name = opts.name ?? null;
    this.alternateName = opts.alternateName ?? null;
    this.additionalType = opts.additionalType ?? null;
    this.description = opts.description ?? null;
    this.disambiguatingDescription = opts.disambiguatingDescription ?? null;
    this.identifier = opts.identifer ?? null;
    this.image = opts.image ?? null;
    this.mainEntityOfPage = opts.mainEntityOfPage ?? null;
    this.potentialAction = opts.potentialAction ?? null;
    this.sameAs = opts.sameAs ?? null;
    this.subjectOf = opts.subjectOf ?? null;
    this.url = opts.url ?? null;

    // Action Schema Properties
    this.actionStatus = opts.actionStatus ?? null;
    this.agent = opts.agent ?? null;
    this.endTime = opts.endTime ?? null;
    this.error = opts.error ?? null;
    this.instrument = opts.instrument ?? null;
    this.location = opts.location ?? null;
    this.object = opts.object ?? null;
    this.participant = opts.participant ?? null;
    this.provider = opts.provider ?? null;
    this.result = opts.result ?? null;
    this.startTime = opts.startTime ?? null;
    this.target = opts.target ?? null;
  }

  // Meta Functions

  static hasString(value) {
    if (value !== null && typeof value === "string" && value.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  static hasProperty(prop) {
    if (this[prop]) {
      return this.hasString(this[prop]);
    } else {
      return false;
    }
  }

}

module.exports = SchemaObject;
