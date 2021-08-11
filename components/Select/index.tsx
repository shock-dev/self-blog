import { CSSProperties } from 'react';
import CustomSelect from 'react-select';

interface SelectProps {
  id: string
  options: any[]
  selectedOption: any
  handleChange: (selectedOption: any) => any
  styles?: CSSProperties
}

const Select = ({
  id,
  options,
  selectedOption,
  handleChange,
  styles
}: SelectProps) => {
  return (
    <div style={{ width: '100%', ...styles }}>
      <CustomSelect
        instanceId={id}
        defaultValue={options[0]}
        value={selectedOption}
        onChange={handleChange}
        options={options}
        styles={{
          option: (base) => ({
            ...base,
            fontSize: '13px'
          }),
          control: (base) => ({
            ...base,
            height: '38px',
            marginBottom: '20px',
            border: '1px solid #dbdbdb',
            borderRadius: '4px',
            fontSize: '13px'
          }),
          menu: (base) => ({
            ...base,
            marginTop: '1px'
          })
        }}
      />
    </div>
  );
};

export default Select;
