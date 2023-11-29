import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { Popover, Popconfirm } from 'antd';

import ProjectKeys from './ProjectKeys'
import { globalContext } from '../../index'
const ProjectKey = ({ project }) => {
  const { clickProject, toggleProjectOpen } = useContext(globalContext)
  const { maintPrjId, index, maintPrjName, projects, isOpen, sideComponent, tooltip } = project
  const isExpandable = isOpen !== undefined
  const [popoverHovered, setHovered] = useState(false);
  const [popoverClicked, setClicked] = useState(false);


  const handleClick = (type) => {
    clickProject({ maintPrjId, index, maintPrjName, actType: type})
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

  const buildSideComponent = () => {
    if (sideComponent) {
      return React.cloneTask(sideComponent)
    }
    return null
  }

  const projectTitleStyle = {
    ...(clickProject ? { cursor: 'pointer' } : {}),
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
    <li className="rt-project-key">
      <div className="rt-project-key__entry">
        {isExpandable && (
          <div
            style={{ marginRight: '12px' }}
            onClick={() => toggleProjectOpen(project)}
          >
            {!isOpen ? (
              <svg viewBox="64 64 896 896" focusable="false" className="rt-icon" data-icon="right" width="12px" height="12px" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>
            ) : (
                <svg viewBox="64 64 896 896" focusable="false" className="rt-icon" data-icon="right" width="12px" height="12px" fill="currentColor" aria-hidden="true" style={{ transform: 'rotate(90deg)' }}><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>
              )}

          </div>
        )}
        <div
          className="rt-project-key__title"
          // onClick={clickProject && handleClick}
        >
        <Popover
          style={{ width: 500 }}
          content={maintPrjName}
          title=""
          trigger="hover"
          visible={popoverHovered}
          onVisibleChange={handleHoverChange}
        >
          <Popover
            content={
              <>
                <div>
                  <a onClick={handleAddTask}>新增任务</a>
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
            <span style={{...projectTitleStyle}}>{maintPrjName}</span>
          </Popover>
        </Popover>
        </div>
        {buildSideComponent()}
      </div>
      {isOpen && projects && projects.length > 0 && <ProjectKeys projects={projects} />}
    </li>
  )
}

ProjectKey.propTypes = {
  project: PropTypes.shape({
    maintPrjName: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string
    ]).isRequired,
    projects: PropTypes.arrayOf(PropTypes.shape({})),
    isOpen: PropTypes.bool,
    clickTask: PropTypes.func,
  }),
}


export default ProjectKey
