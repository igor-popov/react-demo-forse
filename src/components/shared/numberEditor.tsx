
import * as React from 'react';

interface NumberEditorProps {
    value: number;
    placeholder?: string;
    units?: string;
    className?: string;
    isReadonly?: boolean;
    precision?: number;
    onChange: (change: any) => void;
}

interface NumberEditorState {
    value: string;
}

const DEFAULT_PRECISION = 1;

export class NumberEditor extends React.Component<NumberEditorProps, NumberEditorState> {

    private static ViewDecimalSeparator: string = ',';
    private valuePattern: string;
    private changeHandleMethod: (change: any) => void = this.handleChange.bind(this);
    private blurHandleMethod: () => void = this.handleBlur.bind(this);

    constructor(props: NumberEditorProps) {
        super(props);
        this.state = { value: '' };
    }

    public get precision() {
      return this.props.precision || DEFAULT_PRECISION;
    }

    public componentWillMount() {
        this.setValueToState(this.props.value, this.precision);
        this.valuePattern = this.getValuePattern(this.precision);
    }

    public componentWillReceiveProps(nextProps: NumberEditorProps) {
        const nextPrecision = nextProps.precision || DEFAULT_PRECISION;

        this.setValueToState(nextProps.value, nextPrecision);
        this.valuePattern = this.getValuePattern(nextPrecision);
    }

    render() {

        const valueAsText = this.state.value;

        let classNames = 'form-control eco-number-editor-base ';

        if (this.props.className) {
            classNames += ' ' + this.props.className;
        } else {
            classNames += ' eco-number-editor';
        }

        const valueEditor = (this.props.isReadonly ?
            (
              <input
                type='text'
                pattern={this.valuePattern}
                className={classNames}
                placeholder={this.props.placeholder ? this.props.placeholder : ''}
                value={valueAsText}
                readOnly={true}
              />
            )
            :
            (
              <input
                type='text'
                pattern={this.valuePattern}
                className={classNames}
                placeholder={this.props.placeholder ? this.props.placeholder : ''}
                value={valueAsText}
                onChange={this.changeHandleMethod}
                onBlur={this.blurHandleMethod}
              />
              )
          );

        return this.props.units ? this.appendUnits(valueEditor) : valueEditor;
    }

    private getValuePattern(precision: number) {
        precision = this.validatePrecision(precision);

        if (precision === 0) {
            return `[0-9]+`;
        }

        return `[0-9]+([\.|,][0-9]{1,${precision}})?`;
    }

    private setValueToState(value: number, precision: number) {

        precision = this.validatePrecision(precision);

        const precisionModulator = Math.pow(10, precision);
        value = Math.round(value * precisionModulator) / precisionModulator;

        this.setState({ value: this.convertValueToView(value) });
    }

    private validatePrecision(precision: number) {
        if (precision !== 0 && (!precision || precision < 0 || precision > 10)) {
            precision = DEFAULT_PRECISION;
        }

        return precision;
    }

    private appendUnits(valueEditor: any) {
        return (<div>{valueEditor}{this.props.units}</div>);
    }

    private handleChange(event: any) {
        const valueAsText = this.normalizeValue(event.target.value);
        const value = parseFloat(valueAsText);

        if (valueAsText !== undefined && !isNaN(value) && value !== undefined && valueAsText === value.toString()) {

            this.props.onChange(value);
        } else {
            this.setState({ value: valueAsText });
        }
    }

    private handleBlur() {
        const valueAsText = this.normalizeValue(this.state.value);

        const value = parseFloat(valueAsText);
        if (isNaN(value)) {
            this.props.onChange(undefined);
        } else {
            this.props.onChange(value);
        }
    }

    private normalizeValue(valueAsString: string) {
        return valueAsString.replace(',', '.');
    }

    private convertValueToView(value: number) {
        const valueAsText = (value || value === 0) ? value.toString() : '';
        return valueAsText.replace('.', NumberEditor.ViewDecimalSeparator);
    }
}
