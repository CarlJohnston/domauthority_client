// @flow

import React, { PureComponent } from 'react';
import ReactDataGrid from 'react-data-grid';
import Modal from 'react-modal';

import type { Site as SiteType } from 'components/Sites/Site.type';
import type { onSiteRemove as onSiteRemoveType } from 'components/Sites/onSiteRemove.type';
import type { onSiteUpdate as onSiteUpdateType } from 'components/Sites/onSiteUpdate.type';

import './Sites.css';

Modal.setAppElement('#root');


type SitesData = Array<SiteType>;

type Props = {
  sites: SitesData,
  onSiteRemove: onSiteRemoveType,
  onSiteUpdate: onSiteUpdateType,
};

type State = {
  isModalOpen: boolean,
}

class Sites extends PureComponent<Props, State> {
  getCellActions: () => void;

  constructor(props: Props) {
    super(props);

    this.columns = [
      {
        key: 'title',
        name: 'Title',
        editable: true,
      },
      {
        key: 'url',
        name: 'URL',
      },
    ];

    this.state = {
      isModalOpen: false,
    };

    this.getCellActions = this.getCellActions.bind(this);
    this.openModal = this.openModal.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  openModal() {
    this.setState(() => {
      return {
        isOpenModal: true,
      };
    });
  }

  onOpenModal() {
    
  }

  onCloseModal() {
    
  }

  getCellActions(column, row) {
    const {
      onSiteRemove,
    } = this.props;

    if (column.key === 'url') {
      return [
        {
          icon: 'fi-x',
          callback: () => {
            onSiteRemove({ id: row.id, title: row.title, url: row.url });
          },
        },
      ];
    }
  }

  render() {
    const {
      sites,
      onSiteUpdate,
    } = this.props;

    const {
      isModalOpen,
    } = this.state;

    return (
      <React.Fragment>
        <Modal
          isOpen={isModalOpen}
          onAfterOpen={this.onOpenModal}
          onRequestClose={this.onCloseModal}
        />
        <div>
          Sites
          <ReactDataGrid
            enableCellSelect={true}
            columns={this.columns}
            rowGetter={i => sites[i]}
            rowsCount={sites.length}
            getCellActions={this.getCellActions}
            onGridRowsUpdated={({ fromRowData: data, fromRowId, toRowId, updated }) => {
                if (fromRowId === toRowId &&
                    data.title !== updated.title) {
                  onSiteUpdate({
                    id: data.id,
                    title: updated.title,
                    url: data.url,
                  });
                }
            }}
            minHeight={500}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Sites;
