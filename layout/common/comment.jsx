const createLogger = require('hexo-log');
const { Component } = require('inferno');
const view = require('hexo-component-inferno/lib/core/view');

const logger = createLogger.default();

module.exports = class extends Component {
    render() {
        const { config, page, helper } = this.props;
        const { __ } = helper;
        const { comment } = config;
        if (!comment || typeof comment.type !== 'string') {
            return null;
        }
        const commentColsed = !page.comments;

        return <div class="card">
            <div class="card-content">
                <h3 class="title is-5">{__('article.comments')}</h3>
                {(() => {
                    try {
                        if (!commentColsed) {
                            let Comment = view.require('comment/' + comment.type);
                            Comment = Comment.Cacheable ? Comment.Cacheable : Comment;
                            return <Comment config={config} page={page} helper={helper} comment={comment}/>;
                        } else {
                            return <Fragment>
                                <div id="comment-container">
                                    <div class="gt-container">
                                        <h3 class="menu-label has-text-centered">{__('article.comments_closed')}</h3>
                                    </div>
                                </div>
                            </Fragment>;
                        }
                        // let Comment = view.require('comment/' + comment.type);
                        // Comment = Comment.Cacheable ? Comment.Cacheable : Comment;
                        // return <Comment config={config} page={page} helper={helper} comment={comment} />;
                    } catch (e) {
                        logger.w(`Icarus cannot load comment "${comment.type}"`);
                        return null;
                    }
                })()}
            </div>
        </div>;
    }
};
