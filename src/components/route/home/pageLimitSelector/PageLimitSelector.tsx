import styled from 'styled-components'
import { Div } from '../../../common/design/BlockComponents'
import { ChangeEvent, useContext } from 'react'
import { AppContext } from '../../../providers/appProvider/AppContext'

const PageLimitSelector = () => {
  const { appData, setAppData } = useContext(AppContext);
  const { pageLimit, isTypeFilterApplied, appliedFilter } = appData;


  const options = [
    {id: 'limit1', value: 12},
    {id: 'limit2', value: 24},
    {id: 'limit3', value: 48},
  ];


  const onChangePageLimit = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement
    const limit = target.value;
  }

  return (
    <StyledPageLimitSelector>
      <select value={pageLimit} onChange={onChangePageLimit}>
        {
          options.map(({ value, id }) => (
            <option key={id}>
              {value}
            </option>
          ))
        }
      </select>
    </StyledPageLimitSelector>
  );
}

const StyledPageLimitSelector = styled(Div)`
  width: 100%;
  padding: 20px;
`

export default PageLimitSelector;