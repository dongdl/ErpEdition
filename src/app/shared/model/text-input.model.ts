import { CONTROL_TYPE } from '../constant/control-field-type';
import { InputBase } from './input-base.model';

export class TextInput extends InputBase<string> {
  override controlType = CONTROL_TYPE.INPUT_TEXT;
}
