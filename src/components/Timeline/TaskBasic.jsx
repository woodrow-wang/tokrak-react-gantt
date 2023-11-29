import React from 'react'
import PropTypes from 'prop-types'
import { getDayMonth } from '../../utils/formatDate'
import createClasses from '../../utils/classes'

const buildDataAttributes = (attributes = {}) => {
  const value = {}
  Object.keys(attributes).forEach(name => {
    value[`data-${name}`] = attributes[name]
  })
  return value
}

const Basic = ({ taskName, beginTime, endTime, classes, dataSet, tooltip }) => (
  <div className={createClasses('rt-task', classes)} {...buildDataAttributes(dataSet)}>
    <div className="rt-task__content" aria-hidden="true">
      <span className="rt-task__title">{taskName}</span>
    </div>
    {/* <div className="rt-task__tooltip">
      {tooltip ? (
        // eslint-disable-next-line react/no-danger
        <div dangerouslySetInnerHTML={{ __html: tooltip.split('\n').join('<br>') }} />
      ) : (
          <div>
            <div>{taskName}</div>
            <div>
              <span>起始</span> {getDayMonth(beginTime)}
            </div>
            <div>
              <span>终止</span> {getDayMonth(endTime)}
            </div>
          </div>
        )}
    </div> */}
  </div>
)

Basic.propTypes = {
  taskName: PropTypes.string.isRequired,
  beginTime: PropTypes.instanceOf(Date).isRequired,
  endTime: PropTypes.instanceOf(Date).isRequired,
  style: PropTypes.shape({}),
  classes: PropTypes.arrayOf(PropTypes.string.isRequired),
  dataSet: PropTypes.shape({}),
  tooltip: PropTypes.string,
}

export default Basic
