const db = require('../models/index');

let getTeamMembers = async (req, res) => {
    try {
        const team_members = await db.team_members.findAll({
            where: {
                status: true,
            },
            include: [
                {
                    model: db.team_member_social_medias,
                    as: 'social_medias',
                    attributes: [
                        'username'
                    ],
                    include: [
                        {
                            model: db.social_medias,
                            as: 'media',
                            attributes: [
                                'name', 'key', 'link', 'icon'
                            ]
                        }
                    ]
                }
            ],
            attributes: [ 'name', 'surname', 'profession', 'profile_photo' ],
        });

        if (!team_members || team_members.length === 0) {
            // return res.status(404).json({ error: 'Not found!' });
            return res.status(404);
        }

        res.json(team_members);
    } catch (error) {
        console.error('Error in /team_members route:', error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

module.exports = { getTeamMembers };