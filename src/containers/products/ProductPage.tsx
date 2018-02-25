import * as React from 'react';
import { Product } from '../../domain/product';
import { ProductDto } from '../../dto/product';
import { productApi } from '../../api/productApi';

import { Wait } from '../../components/shared/wait';
import { NumberEditor } from '../../components/shared/numberEditor';
import { TextEditor } from '../../components/shared/textEditor';
import { Property } from '../../components/shared/property';
import { SaveButton } from '../../components/shared/saveButton';

interface ProductPageProps {
    match: any;
}

interface ProductPageState {
  product?: Product;
  isSaved: boolean;
}

class ProductPage extends React.Component<ProductPageProps, ProductPageState> {

    private propertyChangedGeneratorMethod: (property: string) => (change: any) => void;
    private onSaveMethod: () => void;

    constructor(props: ProductPageProps) {
      super(props);
      this.propertyChangedGeneratorMethod = (property: string) => this.onChange.bind(this, property);
      this.onSaveMethod = this.onSave.bind(this);
      this.state = {isSaved: true};
    }

    public componentWillMount() {

        const productId = this.props.match.params.id;
        if (!productId) {
          throw new Error('Page is requested without id');
        }

        if (!this.state.product) {
            productApi.getProduct(productId).then((dto: ProductDto) => {
              const product: Product =  {id: dto.id, name: dto.name, weight: dto.weight};
              this.setState({ product: product, isSaved: false });
        });
      }
    }

    render(): React.ReactNode {

      if (!this.state.product) {
        return (
          <Wait text='Loading'/>
        );
      }

      const product = this.state.product;

      return (
        <div>
          <h1>{product.name}</h1>
          {this.state.isSaved ? <p>Saved!</p> : undefined}
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
          <SaveButton onClick={this.onSaveMethod}/>
        </div>
      );
    }

    private onChange(property: string, change: any) {
      if (this.state.product) {
        const newState = {
          product: Object.assign({}, this.state.product)
        };
        newState.product[property] = change;
        this.setState(newState);
      }
    }

    private onSave() {

      if (!this.state.product) {
        throw new Error('Product is missing');
      }

      const product = this.state.product;
      const dto: ProductDto = {id: product.id, name: product.name, weight: product.weight};
      productApi.upsertProduct(dto).then(() => {
        this.setState({ product: product, isSaved: true });

        window.setInterval(
          () => {
              this.setState({ product: product, isSaved: false });
          },
          2000);

      });
    }
}

export default ProductPage;
