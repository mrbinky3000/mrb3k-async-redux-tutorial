/* @flow */
import React from 'react';

export default class Editable extends React.Component {

	static props: {
		value?: string,
		editing?: boolean,
		onEdit?: Function,
		onDelete?: Function,
		onValueClick?: Function
	};

	static defaultProps: {
		value: '',
		editing: false,
		onEdit: () => {}
	};

	render(): Object {
		const {value, onEdit, onValueClick, editing, ...props} = this.props;

		return (
			<div {...props}>
				{editing ? this.renderEdit() : this.renderValue()}
			</div>
		);
	}

	renderEdit: () => Object = () => {
		return <input type="text"
			ref={
				(e) => e ? e.selectionStart = this.props.value.length : null
			}
			autoFocus={true}
			defaultValue={this.props.value}
			onBlur={this.finishEdit}
			onKeyPress={this.checkEnter} />;
	};

	renderValue: () => Object = () => {
		// If the user clicks a normal note, trigger editing logic.
		const onDelete = this.props.onDelete;

		return (
			<div onClick={this.props.onValueClick}>
				<span className="value">{this.props.value}</span>
				{onDelete ? this.renderDelete() : null}
			</div>
		);
	};

	renderDelete: () => Object = () => {
		return <button
			className="delete"
			onClick={this.props.onDelete}>x</button>;
	};

	checkEnter: (e: Object) => void = (e) => {
		// The user hit *enter*, let's finish up.
		if(e.key === 'Enter') {
			this.finishEdit(e);
		}
	};

	finishEdit: (e: Object) => void = (e) => {
		const value = e.target.value;
		if (value.trim()) {
			this.props.onEdit(value);
		}
	};
}

