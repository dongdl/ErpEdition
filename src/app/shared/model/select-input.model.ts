import { CONTROL_TYPE } from '../constant/control-field-type';
import { InputBase } from './input-base.model';

export class SelectInput extends InputBase<Date> {
  override controlType = CONTROL_TYPE.SELECT;
}
