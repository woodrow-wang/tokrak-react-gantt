/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-task-interactions */
import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { Popover, Popconfirm } from 'antd';
import TaskBasic from './TaskBasic'
import { globalContext } from '../../index'
import { getDayMonth } from '../../utils/formatDate'
const Task = ({ maintTaskId, index, style, styleBase, taskName, beginTime, endTime, classes, dataSet, tooltip }) => {
  const { now, time, clickTask } = useContext(globalContext)
  const [popoverHovered, setHovered] = useState(false);
  const [popoverClicked, setClicked] = useState(false);

  const handleClick = (type) => {
    clickTask({ maintTaskId, index, style, styleBase, taskName, beginTime, endTime, classes, dataSet, tooltip, actType: type })
  }

  const handleAddTask = () => {
    handleClick('addTask')
    setHovered(false);
    setClicked(false);
  }

  const handleDelete = () => {
    handleClick('delete')
    setHovered(false);
    setClicked(false);
  }

  const handleEdit = () => {
    handleClick('edit')
    setHovered(false);
    setClicked(false);
  }

  const taskStyle = {
    ...time.toStyleLeftAndWidth(beginTime, endTime),
    ...(clickTask ? { cursor: 'pointer' } : {}),
  }

  const handleHoverChange = visible => {
    setHovered(visible);
    setClicked(false);
  };

  const handleClickChange = visible => {
    setHovered(false);
    setClicked(visible);
  };

  const hide = () => {
    setHovered(false);
    setClicked(false);
  };

  return (
    <div className="rt-project__task" style={{
      ...taskStyle,
      color: '#fff',
    }}>
      <Popover
        style={{ width: 500 }}
        content={
          <div>
            <div>
              <span>起始</span> {getDayMonth(beginTime)}
            </div>
            <div>
              <span>终止</span> {getDayMonth(endTime)}
            </div>
          </div>
        }
        title={taskName}
        trigger="hover"
        visible={popoverHovered}
        onVisibleChange={handleHoverChange}
      >
        <Popover
          content={
            <>
              <div>
                <a onClick={handleAddTask}>发起流程</a>
              </div>
              <div>
                <Popconfirm title="确定删除?" onConfirm={() => handleDelete()}>
                  <a>删除</a>
                </Popconfirm>
              </div>
              <div>
                <a onClick={handleEdit}>编辑</a>
              </div>
              <div>
                <a onClick={hide}>关闭</a>
              </div>
            </>
          }
          title=""
          trigger="click"
          visible={popoverClicked}
          onVisibleChange={handleClickChange}
        >

          <div style={{
            position: 'absolute',
            width: '100%',
            height: '40px',
            backgroundColor: '#bbb',
            filter: (index % 2 == 0) ? 'brightness(1.15)' : '',
            ...styleBase
          }}></div>
          <div style={{
            position: 'absolute',
            width: Math.max(0, Math.min(time.toX(endTime) - time.toX(beginTime), time.toX(now) - time.toX(beginTime))) || 0,
            height: '40px',
            backgroundColor: '#1890ff',
            filter: (index % 2 == 0) ? 'brightness(1.15)' : '',
            ...style
          }}></div>
          <TaskBasic
            taskName={taskName}
            beginTime={beginTime}
            endTime={endTime}
            classes={classes}
            dataSet={dataSet}
            tooltip={tooltip}
          />

        </Popover>
      </Popover>

    </div>
  )
}

Task.propTypes = {
  styleBase: PropTypes.shape({}),
  style: PropTypes.shape({}),
  classes: PropTypes.arrayOf(PropTypes.string.isRequired),
  dataSet: PropTypes.shape({}),
  taskName: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  beginTime: PropTypes.instanceOf(Date).isRequired,
  endTime: PropTypes.instanceOf(Date).isRequired,
  tooltip: PropTypes.string,
  clickTask: PropTypes.func,
}

Task.defaultTypes = {
  clickTask: undefined,
}

export default Task
