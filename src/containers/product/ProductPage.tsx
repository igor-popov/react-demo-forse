import * as React from 'react';
import { connect } from 'react-redux';
import { Product } from '../../domain/product';

import { Wait } from '../../components/shared/wait';
import { NumberEditor } from '../../components/shared/numberEditor';
import { TextEditor } from '../../components/shared/textEditor';
import { Property } from '../../components/shared/property';
import { SaveButton } from '../../components/shared/saveButton';

import { AppState } from '../../domain/state';
import * as constants from './constants';

import './ProductPage.css';

interface ProductPageProps {
    match: any;

    product: Product;
    isJustSaved: boolean;

    loadProduct: (productId: string) => any;
    saveProduct: (product: Product) => any;
}

interface ProductPageState {
    editableProduct?: Product;
}

class ProductPage extends React.Component<ProductPageProps, ProductPageState> {

    private propertyChangedGeneratorMethod: (property: string) => (change: any) => void;
    private onSaveMethod: () => void;

    constructor(props: ProductPageProps) {
      super(props);
      this.propertyChangedGeneratorMethod = (property: string) => this.onChange.bind(this, property);
      this.onSaveMethod = this.onSave.bind(this);
      this.state = {};
    }

    public componentWillMount() {

        const productId = this.props.match.params.id;
        if (!productId) {
          throw new Error('Page is requested without id');
        }

        if (!this.props.product || this.props.product.id !== productId) {
          this.props.loadProduct(productId);
        } else if (!this.state.editableProduct || this.state.editableProduct.id !== productId) {
          this.initializeEditableProduct(this.props.product);
        }
    }

    public componentWillReceiveProps(props: ProductPageProps) {
      let editableProductId = !this.state.editableProduct ? undefined : this.state.editableProduct.id;
      let originalProductId = !props.product ? undefined : props.product.id;

      if (!originalProductId) {
        return;
      }

      if (!editableProductId || editableProductId !== originalProductId) {
        this.initializeEditableProduct(props.product);
      }
    }

    render(): React.ReactNode {

      const product = this.state.editableProduct;
      const isJustSaved = this.props.isJustSaved;

      if (!product) {
        return (
          <Wait text='Loading'/>
        );
      }

      return (
        <div className='product-page'>
          <h1>{product.name}</h1>
          {isJustSaved ? <div className='alert alert-success' role='alert'>Saved!</div> : undefined}
          <div className='content'>
            <Property text='Navn'>
              <TextEditor
                value={product.name}
                placeholder='produktnavn'
                onChange={this.propertyChangedGeneratorMethod('name')}
                focus={true}
              />
            </Property>
            <Property text='Vekt'>
              <NumberEditor
                value={product.weight}
                placeholder='produktvekt'
                onChange={this.propertyChangedGeneratorMethod('weight')}
                units='kg'
              />
            </Property>
          </div>
            <SaveButton onClick={this.onSaveMethod}/>

        </div>
      );
    }

    private onChange(property: string, change: any) {
      const product = this.state.editableProduct;

      if (product) {
        const newState = {
          editableProduct: Object.assign({}, product)
        };
        newState.editableProduct[property] = change;
        this.setState(newState);
      }
    }

    private onSave() {
      const product = this.state.editableProduct;

      if (!product) {
        throw new Error('Product is missing');
      }

      this.props.saveProduct(product);
    }

    private initializeEditableProduct(product: Product) {
      const newState = {
        editableProduct: Object.assign({}, product)
      };
      this.setState(newState);
    }
}

function mapStateToProps(state: AppState) {
    let product: Product = state.product.current || {id: '', name: '', weight: 1} as Product;

    return {
      product: product,
      isJustSaved: !!state.product.isJustSaved
    };
}

function mapDispatchToProps(dispatch: Function) {
    return {
      loadProduct: (productId: string) => dispatch({type: constants.PRODUCT_REQUEST_START, productId: productId}),
      saveProduct: (product: Product) => dispatch({type: constants.PRODUCT_SAVE_START, product: product}),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductPage);
