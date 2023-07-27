// Essentials
import React from 'react';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';

// Assets
import { MdSort, MdArrowUpward, MdArrowDownward } from 'react-icons/md';

const TableHeader = ({
  headerList,
  sortFields, setSortFields
}) => {
  const isInSortFields = (header) => {
    return sortFields.find(sortField => sortField.field === header.sort_field);
  };

  const getSortFieldIdx = (header) => {
    return sortFields.map(sortField => sortField.field).indexOf(header.sort_field);
  };

  const getSortField = (header) => {
    return sortFields[getSortFieldIdx(header)];
  };

  const editSortField = (header, newBy) => {
    const sortFieldIdx = getSortFieldIdx(header);
    setSortFields([
      ...sortFields.slice(0, sortFieldIdx),
      { field: header.sort_field, by: newBy },
      ...sortFields.slice(sortFieldIdx + 1)
    ]);
  };

  const removeFromSortFields = (header) => {
    const sortFieldIdx = getSortFieldIdx(header);
    setSortFields([
      ...sortFields.slice(0, sortFieldIdx),
      ...sortFields.slice(sortFieldIdx + 1)
    ]);
  };

  const getStyle = (header) => {
    if (header.sort_field && isInSortFields(header)) return '-active';
    if (!header.sort_field) return '-static';
    return '';
  };

  const onClick = (header) => {
    if (!header.sort_field) return;
    if (!isInSortFields(header)) setSortFields([...sortFields, { field: header.sort_field, by: 'asc' }]);
    else if (getSortField(header).by === 'asc') editSortField(header, 'desc')
    else removeFromSortFields(header);
  };

  const getIcon = (header) => {
    if (!header.sort_field) return;
    if (isInSortFields(header)) {
      if (getSortField(header).by === 'asc') return !header.isReversed ? <MdArrowUpward /> : <MdArrowDownward />;
      else return !header.isReversed ? <MdArrowDownward /> : <MdArrowUpward />;
    }
    return <MdSort />;
  };
  return (
    <>
      <Row>
        {headerList && headerList.map((header, idx) => (
          <OverlayTrigger
            key={idx}
            placement='top'
            overlay={header.tip ?
              <Tooltip style={{ position: 'fixed' }}>
                {header.tip}
              </Tooltip> : <></>
            }
          >
            <Col
              className={`mn-table-header${getStyle(header)} ${header.tip ? 'mn-underline' : ''}`}
              onClick={() => onClick(header)}
              xs={header.size}
            >
              <div
                className='d-flex align-items-center justify-content-between'
              >
                <div>{header.label}</div>
                {getIcon(header)}
              </div>
            </Col>
          </OverlayTrigger>
        ))}
      </Row>
    </>
  );
}

export default TableHeader;