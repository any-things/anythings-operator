/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

var mix = (superclass) => new MixinBuilder(superclass);

class MixinBuilder {
	constructor(superclass) {
		this.superclass = superclass;
	}

	with(...mixins) {
		return mixins.reduce((callback, mixin) => mixin(callback), this.superclass);
	}
}