// @flow

import React, { PureComponent } from 'react';
import ReactDataGrid from 'react-data-grid';
import Modal from 'react-modal';
import $ from 'jquery';
import { BeatLoader as Loader } from 'react-spinners';

import type { ElementRef } from 'react';
import type { Site as SiteType } from 'components/Sites/Site.type';
import type { onSiteRemove as onSiteRemoveType } from 'components/Sites/onSiteRemove.type';
import type { onSiteUpdate as onSiteUpdateType } from 'components/Sites/onSiteUpdate.type';
import type { onSiteCreate as onSiteCreateType } from 'components/Sites/onSiteCreate.type';

import './Sites.css';

window.jQuery = window.$ = $;
require('foundation-sites');


type SitesData = Array<SiteType>;

type Props = {
  sites: SitesData,
  onSiteRemove: onSiteRemoveType,
  onSiteUpdate: onSiteUpdateType,
  onSiteCreate: onSiteCreateType,
};

type State = {
  isModalOpen: boolean,
  isModalLoading: boolean,
}

class Sites extends PureComponent<Props, State> {
  registerFormNode: {
    current: ElementRef<'form'> | null,
  };
  $form: JQuery;
  getCellActions: () => void;
  openModal: () => void;
  onOpenModal: () => void;
  onCloseModal: () => void;
  columns: Array<{
    key: string,
    name: string,
    editable?: boolean,
  }>
  createSiteForm: {
    current: ElementRef<'form'> | null,
  };

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
      isModalLoading: false,
    };

    this.createSiteForm = React.createRef();

    this.getCellActions = this.getCellActions.bind(this);
    this.openModal = this.openModal.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  openModal() {
    this.setState(() => {
      return {
        isModalOpen: true,
      };
    });
  }

  onOpenModal(): void {
    if (this.createSiteForm.current) {
      this.$form = $(this.createSiteForm.current);

      // $FlowFixMe
      this.$form.foundation();

      this.$form.on('formvalid.zf.abide', (e) => {
        const title = this.$form.find('#title').val();
        const url = this.$form.find('#url').val();

        this.setState(() => {
          return {
            isModalLoading: true,
          };
        });

        const {
          onSiteCreate,
        } = this.props;

        onSiteCreate({
          id: -1, // no ID assigned until creation
          title: title,
          url: url,
        }, () => {
          this.setState(() => {
            return {
              isModalOpen: false,
              isModalLoading: false,
            };
          });
        });
      });
    }
  }

  onCloseModal() {
    this.setState(() => {
      return {
        isModalOpen: false,
      };
    });
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
      isModalLoading,
    } = this.state;

    return (
      <React.Fragment>
        <Modal
          isOpen={isModalOpen}
          onAfterOpen={this.onOpenModal}
          onRequestClose={this.onCloseModal}
        >
          <Loader
            loading={isModalLoading}
          />
          {!isModalLoading &&
           (
             <div>
               <h1>
                 Add
               </h1>
               <form onSubmit={e => e.preventDefault()} ref={this.createSiteForm} data-abide noValidate>
                 <label>
                   Title
                   <input id='title' name='title' type='text' placeholder='Title' required />
                 </label>
                 <span className='form-error' data-form-error-for='title'>
                   Please enter a valid title.
                 </span>
                 <label>
                   URL
                   <input id='url' className='input-group' placeholder='https://www.site.com/' name='url' type='text' pattern='url' required />
                 </label>
                 <span className='form-error' data-form-error-for='url'>
                   Please enter a valid URL.
                 </span>
                 <button className='button' type='submit'>
                   Submit
                 </button>
               </form>
             </div>
           )
          }
        </Modal>
        <div>
          <h1>
            Sites
          </h1>
          <button
            type='button'
            id='add-site'
            className='button primary'
            onClick={this.openModal}
          >
            Add
          </button>
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
