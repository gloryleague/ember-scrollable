import Ember from 'ember';
import KeyEventsMixin from '../mixins/key-events';

export default Ember.View.extend(KeyEventsMixin, {
  classNameBindings: [':quick-jump', 'isActive:active', 'isLoading:loading'],

  isActive: false,
  isLoading: Ember.computed.alias('controller.requestPromise.isLoading'),
  placeholder: null,

  clickEventName: function() {
    return `click.${this.get('elementId')}`;
  }.property('elementId'),

  didInsertElement: function() {
    Ember.$(document).on(this.get('clickEventName'), (event) => {
      var $target = Ember.$(event.target);
      var $nonBlurringElements = this.$('.bar, .results');

      if ($target.closest($nonBlurringElements).length === 0) {
        this.set('isActive', false);
      }

      return true;
    });
  },

  willDestroyElement: function() {
    Ember.$(document).off(this.get('clickEventName'));
  },

  onIsActiveDidChange: function() {
    if (!this.get('isActive')) {
      this.$('input').blur();
    }
  }.observes('isActive'),

  actions: {
    onBarFocusIn: function() {
      this.set('isActive', true);
    }
  },

  keyEvents: {
    esc: function() {
      this.set('isActive', false);
    }
  }
});
