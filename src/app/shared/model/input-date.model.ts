import { CONTROL_TYPE } from '../constant/control-field-type';
import { InputBase } from './input-base.model';

export class InputDate extends InputBase<Date> {
  override controlType = CONTROL_TYPE.INPUT_DATE;
}
