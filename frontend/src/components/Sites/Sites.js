// @flow

import React, { PureComponent } from 'react';
import ReactDataGrid from 'react-data-grid';

import type { Site as SiteType } from 'components/Sites/Site.type';
import type { onSiteRemove as onSiteRemoveType } from 'components/Sites/onSiteRemove.type';
import type { onSiteUpdate as onSiteUpdateType } from 'components/Sites/onSiteUpdate.type';

import './Sites.css';


type SitesData = Array<SiteType>;

type Props = {
  sites: SitesData,
  onSiteRemove: onSiteRemoveType,
  onSiteUpdate: onSiteUpdateType,
};

class Sites extends PureComponent<Props> {
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

    this.getCellActions = this.getCellActions.bind(this);
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

    return (
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
    );
  }
}

export default Sites;
