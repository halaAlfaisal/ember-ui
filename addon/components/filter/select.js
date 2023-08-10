import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action, get } from '@ember/object';
import { isArray } from '@ember/array';

export default class FilterSelectComponent extends Component {
    @service fetch;
    @tracked value;
    @tracked options = [];
    @tracked isLoading = false;

    constructor() {
        super(...arguments);
        this.value = this.args.value;
        this.options = isArray(options) ? options : [];

        if (typeof filter?.filterFetchOptions === 'string') {
            this.fetchOptions(filter?.filterFetchOptions);
        }
    }

    @action onChange(selection) {
        const { onChange, filter } = this.args;

        this.value = selection;

        if (typeof onChange === 'function') {
            onChange(filter, selection);
        }
    }

    @action fetchOptions(uri, params = {}) {
        const { fetchParams } = this.args;
        const queryParams = assign(params, fetchParams ?? {});

        this.isLoading = true;
        this.fetch
            .get(uri, queryParams)
            .then((options) => {
                this.options = options;
            })
            .finally(() => {
                this.isLoading = false;
            });
    }
}
