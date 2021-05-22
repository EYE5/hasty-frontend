import { Rule } from "./rule";
import * as rules from "./rules";

type MessageFactory = () => string;

export type Message = string | MessageFactory;

export type Modifier = (value: any) => any;

export class Validator {
  private readonly next?: Validator;
  private rule?: Rule;
  private message?: string;
  private modifier: Modifier = (value) => value;
  private strict = true;
  private inverse = false;
  private another?: Validator;
  private proxy = false;

  constructor(next?: Validator, proxy = false) {
    this.next = next;
    this.proxy = proxy;
    this.check = this.check.bind(this);
  }

  public use(rule: Rule, message?: Message, modifier?: Modifier): Validator {
    if (this.proxy) return new Validator().use(rule, message, modifier);

    this.rule = rule;
    this.modifier = modifier ?? this.modifier;
    this.message = typeof message === "function" ? message() : message;

    return new Validator(this);
  }

  public check(value: any): boolean | string {
    if (!this.strict && value === undefined) return true;
    else if (!this.rule) return this.next?.check(this.modifier(value)) ?? true;

    let result = this.rule(value);

    if (this.inverse) result = !result;

    if (!result && this.another?.check(this.modifier(value)) === true)
      result = true;

    const response = result ? true : this.message ?? false;

    return result
      ? this.next?.check(this.modifier(value)) ?? response
      : response;
  }

  public string(message?: Message, modifier?: Modifier): Validator {
    return this.use(rules.isString, message, modifier);
  }

  public number(message?: Message, modifier?: Modifier): Validator {
    return this.use(rules.isNumber, message, modifier);
  }

  public boolean(message?: Message, modifier?: Modifier): Validator {
    return this.use(rules.isBoolean, message, modifier);
  }

  public object(message?: Message, modifier?: Modifier): Validator {
    return this.use(rules.isObject, message, modifier);
  }

  public null(message?: Message, modifier?: Modifier): Validator {
    return this.use(rules.isNull, message, modifier);
  }

  public defined(message?: Message, modifier?: Modifier): Validator {
    return this.use(rules.isDefined, message, modifier);
  }

  public notDefined(message?: Message, modifier?: Modifier): Validator {
    return this.use(rules.isUndefined, message, modifier);
  }

  public none(message?: Message, modifier?: Modifier): Validator {
    return this.use(rules.isNone, message, modifier);
  }

  public notNone(message?: Message, modifier?: Modifier): Validator {
    return this.use(rules.isNotNone, message, modifier);
  }

  public min(
    minumum: number,
    message?: Message,
    modifier?: Modifier
  ): Validator {
    return this.use(rules.min.bind(undefined, minumum), message, modifier);
  }

  public max(
    maximum: number,
    message?: Message,
    modifier?: Modifier
  ): Validator {
    return this.use(rules.max.bind(undefined, maximum), message, modifier);
  }

  public eq(reference: any, message?: Message, modifier?: Modifier): Validator {
    return this.use(rules.eq.bind(undefined, reference), message, modifier);
  }

  public ne(reference: any, message?: Message, modifier?: Modifier): Validator {
    return this.use(rules.ne.bind(undefined, reference), message, modifier);
  }

  public gt(
    threshold: number,
    message?: Message,
    modifier?: Modifier
  ): Validator {
    return this.use(rules.gt.bind(undefined, threshold), message, modifier);
  }

  public gte(
    threshold: number,
    message?: Message,
    modifier?: Modifier
  ): Validator {
    return this.use(rules.gte.bind(undefined, threshold), message, modifier);
  }

  public lt(
    threshold: number,
    message?: Message,
    modifier?: Modifier
  ): Validator {
    return this.use(rules.lt.bind(undefined, threshold), message, modifier);
  }

  public lte(
    threshold: number,
    message?: Message,
    modifier?: Modifier
  ): Validator {
    return this.use(rules.lte.bind(undefined, threshold), message, modifier);
  }

  public between(
    minimum: number,
    maximum: number,
    message?: Message,
    modifier?: Modifier
  ): Validator {
    return this.use(
      rules.lt.bind(undefined, minimum, maximum),
      message,
      modifier
    );
  }

  public minLength(
    length: number,
    message?: Message,
    modifier?: Modifier
  ): Validator {
    return this.use(rules.minLength.bind(undefined, length), message, modifier);
  }

  public maxLength(
    length: number,
    message?: Message,
    modifier?: Modifier
  ): Validator {
    return this.use(rules.maxLength.bind(undefined, length), message, modifier);
  }

  public strictLength(
    length: number,
    message?: Message,
    modifier?: Modifier
  ): Validator {
    return this.use(
      rules.strictLength.bind(undefined, length),
      message,
      modifier
    );
  }

  public lengthBetween(
    minimum: number,
    maximum: number,
    message?: Message,
    modifier?: Modifier
  ): Validator {
    return this.use(
      rules.lengthBetween.bind(undefined, minimum, maximum),
      message,
      modifier
    );
  }

  public optional(): Validator {
    if (this.proxy) return new Validator().optional();

    this.strict = false;

    return this;
  }

  public not(): Validator {
    if (this.proxy) return new Validator().not();

    this.inverse = true;

    return this;
  }

  public or(another: Validator): Validator {
    if (this.proxy) return new Validator().or(another);

    this.another = another;

    return this;
  }
}

export default Validator;
