import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { Repository } from '../../store/ducks/repositories/types';
import { bindActionCreators, Dispatch } from 'redux';
import * as RepositoriesActions from '../../store/ducks/repositories/actions';

/* Mapeia os tipos de informações que vem do mapStateToProps*/
interface StateProps {
    repositories: Repository[];
}

/* Mapeia as funções */
interface DispatchProps {
    loadRequest(): void
}

/** Mapeia propriedades que vem dos componentes pai */
interface OwnProps {

}

type Props = StateProps & DispatchProps & OwnProps;

class RepositoryList extends Component<Props> {
    /** Chamado imediatamente após a montagem de um componente. Definir o estado aqui 
     * irá desencadear uma nova renderização. */
    componentDidMount() {
        const { loadRequest } = this.props;

        loadRequest();
    }

    render() {
        const { repositories } = this.props;
        return (
            <ul>
                {repositories.map(repository => repository.name)}
            </ul>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    repositories: state.repositories.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(RepositoriesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryList);